const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://gdg-backend-dx5f.onrender.com').replace(/\/$/, '');

export const formatImageUrl = (url: string) => {
  if (!url) return "";
  if (url.includes('drive.google.com') || url.includes('googleusercontent.com')) {
    const idMatch = url.match(/id=([^&]+)/) || url.match(/\/d\/([^/&?]+)/) || url.match(/\/d\/([^=]+)/);
    if (idMatch) return `https://lh3.googleusercontent.com/d/${idMatch[1]}=w1000`;
  }
  return url;
};

export const fetchBlogs = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/blogs`);
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return await res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export const fetchBlogById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/blogs/${id}`);
    if (!res.ok) throw new Error('Failed to fetch blog');
    return await res.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

export const fetchEvents = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/events`);
    if (!res.ok) throw new Error('Failed to fetch events');
    return await res.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const fetchEventById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/events/${id}`);
    if (!res.ok) throw new Error('Failed to fetch event');
    return await res.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
};

export const fetchTeamMembers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/team`);
    if (!res.ok) throw new Error('Failed to fetch team');
    return await res.json();
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
};

export const fetchProjects = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return await res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const fetchProjectById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/projects/${id}`);
    if (!res.ok) throw new Error('Failed to fetch project');
    return await res.json();
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
};

export const fetchCommunityStories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/community`);
    if (!res.ok) throw new Error('Failed to fetch community stories');
    return await res.json();
  } catch (error) {
    console.error("Error fetching community stories:", error);
    return [];
  }
};
