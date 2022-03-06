/**
 * Git config file
 */
export const options = {
  // git token read from the env variable
  githubAccessToken: process.env.githubToken!,
  // set the username you want to be mentioned in the Issue
  user: process.env.githubUserName!,
};
