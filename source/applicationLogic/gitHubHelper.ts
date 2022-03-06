import { Octokit } from "@octokit/rest";

const options = {
  githubAccessToken: process.env.githubToken!,
  user: "Ritesh007",
};

const octokit = new Octokit({
  auth: options.githubAccessToken,
});

async function createBranchProtectionRule(req: any) {
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
      const responseBranchProtectionRule = await octokit.request(
        `PUT ${reqJson.repository.url}/branches/${reqJson.repository.default_branch}/protection`,
        branch_protection
      );
      if (
        responseBranchProtectionRule.status >= 200 &&
        responseBranchProtectionRule.status < 300
      ) {
        console.log(
          "Branch Protection rule is created for -" + reqJson.repository.url
        );
      }
      if (reqJson.repository.has_issues === true) {
        const issue = {
          title: "Protection Rule Added",
          body:
            "@" +
            options.user +
            ` Branch protection was added to the ${reqJson.repository.default_branch} branch`,
        };
        const responseIssue = await octokit.request(
          `POST ${reqJson.repository.url}/issues`,
          issue
        );
        console.log(responseIssue.status);
        if (responseIssue.status >= 200 && responseIssue.status < 300) {
          console.log("Issue created for " + reqJson.repository.url);
        }
      }
    }
  } catch (e: any) {
    throw new Error(e);
  }
  return "OK";
}

export async function webhook(req: any, res: any) {
  try {
    return await createBranchProtectionRule(req);
  } catch (e: any) {
    console.log("Failed", e);
  }
}
