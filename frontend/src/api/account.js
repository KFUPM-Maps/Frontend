import api from "./api";

export const getUpdateAccountRequest = async () => {
  try {
    const res = await api.get("/account/updateaccount");
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message || error.message || "Get account failed",
    };
  }
};

export const putUpdateAccountRequest = async (accountData) => {
  try {
    const res = await api.put("/account/updateaccount", accountData);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Update account failed",
    };
  }
};

export const uploadProfilePhoto = async (file, uploadUrl) => {
  try {
    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!uploadRes.ok) {
      throw new Error(`File upload failed with status ${uploadRes.status}`);
    }

    const data = await uploadRes.json();

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message || error.message || "File upload failed",
    };
  }
};
