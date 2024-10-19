'use strict';

const useProfile = () => {
  const loginWithEmail = async (data) => {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(data)
        }
      );
      return await req.json();
    } catch (error) {
      console.log(error);
    }
  };
  const loginWithDni = async (data) => {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/dni`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      return await req.json();
    } catch (error) {
      console.log(error);
    }
  };
  const getRoles = async (token) => {
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/roles`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return await req.json();
    } catch (error) {
      console.log(error);
    }
  };
  return {
    loginWithEmail,
    loginWithDni,
    getRoles
  };
};

exports.useProfile = useProfile;
//# sourceMappingURL=use-profile.js.map
//# sourceMappingURL=use-profile.js.map