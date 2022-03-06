import { Octokit } from "@octokit/rest";

const options = {
  githubAccessToken: process.env.githubToken!,
  githubOrganisation: process.env.githubOrg!,
};

const octokit = new Octokit({
  auth: options.githubAccessToken,
});

async function createBranchProtectionRule(req: any) {
  if (req === "{}") {
    console.log("Payload is empty");
    return "OK";
  }
  console.log(req);
  const reqJson = JSON.parse(req);
  try {
    if (reqJson.action === "created") {
      console.log("A new repository created event is triggered");
      const branch_protection = {
        required_status_checks: { strict: "True", contexts: ["default"] },
        enforce_admins: "False",
        required_pull_request_reviews: "None",
        restrictions: "None",
      };
      const response = await octokit.request(
        `PUT ${reqJson.repository.url}/branches/master/protection`,
        branch_protection
      );
      if (response.status === 200) {
        console.log(
          "Branch Protection rule is created for -" + reqJson.repository.url
        );
      }
    }
  } catch (e: any) {
    throw new Error(e);
  }
  return "OK";
}

export async function webhook(req: any, res: any) {
  try {
    console.log(req);
    return await createBranchProtectionRule(req);
  } catch (e: any) {
    console.log("Failed", e);
  }
}
