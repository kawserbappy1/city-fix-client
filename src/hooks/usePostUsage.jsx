import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePostUsage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: usage } = useQuery({
    queryKey: ["post-usage", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/usage/${user.email}`);
      return res.data;
    },
  });

  return { usage };
};
export default usePostUsage;
