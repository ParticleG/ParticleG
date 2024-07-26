import { githubApi, githubRaw } from 'boot/axios';

export const getProfileInfo = async () => {};

export const getProfileReadMe = async (
  username: string,
): Promise<{ content: string; url: string } | undefined> => {
  try {
    const url = `/${username}/${username}/main/README.md`;
    return {
      content: (await githubRaw.get(url)).data.toString(),
      url,
    };
  } catch {}
  try {
    const url = `/${username}/${username}/master/README.md`;
    return {
      content: (await githubRaw.get(url)).data.toString(),
      url,
    };
  } catch {}
  try {
    const branch = (
      await githubApi.get(`/repos/${username}/${username}/branches`)
    ).data.toJSON()[0].name;
    const url = `/${username}/${username}/${branch}/README.md`;
    return {
      content: (await githubRaw.get(url)).data.toString(),
      url,
    };
  } catch {}
};
