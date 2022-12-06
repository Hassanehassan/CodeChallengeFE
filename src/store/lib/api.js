export const postLoginInput = async (
  user,
  { rejectWithValue, fulfillWithValue }
) => {
  try {
    const response = await fetch("http://34.245.213.76:3000/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    localStorage.setItem("token", data.accessToken);
    return fulfillWithValue(data);
  } catch (error) {
    return rejectWithValue(error.message);
  }
};

export const getAllArticles = async (
  page,
  { rejectWithValue, fulfillWithValue }
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "http://34.245.213.76:3000/articles?page=" + page,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    const transformedQuotes = [];

    transformedQuotes.push(data.response.docs);
    return fulfillWithValue(transformedQuotes[0]);
  } catch (error) {
    return rejectWithValue(error.message);
  }
};
