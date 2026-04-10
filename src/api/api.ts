const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://gdg-backend-dx5f.onrender.com').replace(/\/$/, '');

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
