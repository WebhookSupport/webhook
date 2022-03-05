import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.githubToken,
});

async function createBranchProtectionRule() {
  return;
}

export async function webhook(req: any, res: any) {
  try {
    console.log(req.body);
    await createBranchProtectionRule();
  } catch (e: any) {
    console.log("Failed", e);
  }
}
