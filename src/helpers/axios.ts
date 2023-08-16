import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

export async function post(segment: string, formData: any) {
  try {
    const response = await axios.post(
      `${apiUrl}${segment}`,
      formData
    );
    const data = response.data;
    return data;
  } catch (error) {}
}
export async function get(segment: string) {
  try {
    const response = await axios.get(
      `${apiUrl}${segment}`
    );
    const data = response.data;
    return data;
  } catch (error) {}
}
