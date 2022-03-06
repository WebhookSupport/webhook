/**
 * Accepts github webhook post call and checks if it's a repository creation call
 * If it's a repository creation call then a branch protection rule is created along with an issue
 */

import { options } from "../config/gitHubConfig";
import { branchProtectionRule, issueCreation } from "../helper/gitHubHelper";

async function createBranchProtectionRule(req: any): Promise<string> {
  if (req === "{}") {
    console.log("Payload is empty");
    return "OK";
  }
  const reqJson = JSON.parse(req);
  try {
    if (reqJson.action === "created") {
      console.log("A new repository created event is triggered");
      const branch_protection = {
        required_status_checks: null,
        enforce_admins: true,
        required_pull_request_reviews: {
          dismiss_stale_reviews: true,
          require_code_owner_reviews: true,
          required_approving_review_count: 1,
        },
        restrictions: "None",
      };
      const responseBranchProtectionRule = await branchProtectionRule(
        reqJson,
        branch_protection
      );
      if (
        responseBranchProtectionRule.status >= 200 &&
        responseBranchProtectionRule.status < 300
      ) {
        console.log(
          "Branch Protection rule is created for " + reqJson.repository.url
        );
      } else {
        console.log(
          "Branch Protection rule is not created for " + reqJson.repository.url
        );
        return "OK";
      }
      if (reqJson.repository.has_issues === true) {
        const issue = {
          title: "Protection Rule Added",
          body:
            "@" +
            options.user +
            ` Branch protection was added to the ${reqJson.repository.default_branch} branch`,
        };
        const responseIssue = await issueCreation(reqJson, issue);
        console.log(responseIssue.status);
        if (responseIssue.status >= 200 && responseIssue.status < 300) {
          console.log("Issue created for " + reqJson.repository.url);
        } else {
          console.log("Issue not created for " + reqJson.repository.url);
          return "OK";
        }
      }
    } else {
      console.log("This is not a repository created event no action taken ");
      return "OK";
    }
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function webhook(req: any, res: any) {
  try {
    return await createBranchProtectionRule(req);
  } catch (e: any) {
    console.log("Failed", e);
  }
}
