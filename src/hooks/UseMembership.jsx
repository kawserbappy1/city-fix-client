import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UseMembership = () => {
  const { user, loader } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: membership, isLoading: isMemberShipLoading } = useQuery({
    queryKey: ["membership", user?.email],
    enabled: !loader && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/membership/${user.email}`);
      return data.membership;
    },
  });

  return { membership, isMemberShipLoading };
};

export default UseMembership;
