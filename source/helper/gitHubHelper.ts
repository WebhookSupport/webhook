/**
 * Github API calls
 */
import { Octokit } from "@octokit/rest";
import { options } from "../config/gitHubConfig";

const octokit = new Octokit({
  auth: options.githubAccessToken,
});

export async function branchProtectionRule(
  reqJson: any,
  branch_protection: {
    required_pull_request_reviews: {
      required_approving_review_count: number;
      require_code_owner_reviews: boolean;
      dismiss_stale_reviews: boolean;
    };
    required_status_checks: null;
    restrictions: string;
    enforce_admins: boolean;
  }
) {
  return await octokit.request(
    `PUT ${reqJson.repository.url}/branches/${reqJson.repository.default_branch}/protection`,
    branch_protection
  );
}

export async function issueCreation(
  reqJson: any,
  issue: { title: string; body: string }
) {
  return await octokit.request(`POST ${reqJson.repository.url}/issues`, issue);
}
