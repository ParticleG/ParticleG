import { githubApi, githubRaw } from 'boot/axios';
import { GithubUser, GithubUserOrganization } from 'utils/requests/types';

export const getProfileReadMe = async (
  username: string,
): Promise<{ content: string; url: string } | undefined> => {
  try {
    const url = `/${username}/${username}/main/README.md`;
    return {
      content: (await githubRaw.get<string>(url)).data,
      url,
    };
  } catch {}
  try {
    const url = `/${username}/${username}/master/README.md`;
    return {
      content: (await githubRaw.get<string>(url)).data,
      url,
    };
  } catch {}
  try {
    const branch = (
      await githubApi.get(`/repos/${username}/${username}/branches`)
    ).data.toJSON()[0].name;
    const url = `/${username}/${username}/${branch}/README.md`;
    return {
      content: (await githubRaw.get<string>(url)).data,
      url,
    };
  } catch {}
};

export const getUser = async (
  username: string,
): Promise<GithubUser | undefined> => {
  try {
    return (await githubApi.get<GithubUser>(`/users/${username}`)).data;
  } catch {}
};

export const getUserOrganizations = async (
  username: string,
): Promise<GithubUserOrganization[] | undefined> => {
  try {
    return (
      await githubApi.get<GithubUserOrganization[]>(`/users/${username}/orgs`)
    ).data;
  } catch {}
};
