import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.githubToken,
});

async function createBranchProtectionRule(req: any) {
  if (JSON.stringify(req) === '{}' ) {
    console.log("Payload is empty");
    return "FAILED";
  }
  return "FAILED";
}

export async function webhook(req: any, res: any) {
  try {
    console.log(req);
    return await createBranchProtectionRule(req);
  } catch (e: any) {
    console.log("Failed", e);
  }
}
