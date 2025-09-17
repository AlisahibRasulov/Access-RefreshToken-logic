// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const Profile = () => {
  // const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  // useEffect(() => {
  //   const axiosData = async () => {
  //     let accessToken = localStorage.getItem("access");
  //     let refreshToken = localStorage.getItem("refresh");

  //     try {
  //       // access token ilə məlumat götür
  //       const res = await axios.get("http://localhost:8080/api/auth", {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       });
  //       setUserInfo(res.data);
  //     } catch (error) {
  //       if (error.response && error.response.status === 401) {
  //         try {
  //           // refresh token ilə access token yenilə
  //           const refreshRes = await axios.post(
  //             "http://localhost:8080/api/auth/refresh",
  //             {},
  //             { headers: { Authorization: `Bearer ${refreshToken}` } }
  //           );

  //           // yeni access token localStorage-a yaz
  //           accessToken = refreshRes.data.accessToken;
  //           refreshToken = refreshRes.data.refreshToken;
  //           localStorage.setItem("access", accessToken);
  //           localStorage.setItem("refresh", refreshToken);

  //           // yenidən məlumat götür
  //           const newRes = await axios.get("http://localhost:8080/api/auth", {
  //             headers: { Authorization: `Bearer ${accessToken}` },
  //           });

  //           setUserInfo(newRes.data);
  //         } catch (refreshError) {
  //           console.error("Refresh token də etibarsızdır:", refreshError);
  //           localStorage.removeItem("access");
  //           localStorage.removeItem("refresh");
  //           setUserInfo(null);
  //           // navigate("/login"); // refresh də alınmadısa login səhifəsinə yönləndir
  //           window.location.href = "/login"; // refresh ölübsə loginə at
  //           return;
  //         }
  //       } else {
  //         console.error("Başqa xəta:", error);
  //         // navigate("/login");
  //         window.location.href = "/login"; // refresh ölübsə loginə at
  //         return;
  //       }
  //     }
  //   };

  //   axiosData();
  // }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/auth");
        setUserInfo(res.data);
      } catch (error) {
        console.error("Məlumat alınmadı:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-[90%] max-w-md">
        {userInfo ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Xoş gəldin,{" "}
              <span className="text-blue-600">{userInfo.firstName}</span>
            </h2>
          </>
        ) : (
          <p className="text-gray-600">Məlumatlar yüklənir...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
