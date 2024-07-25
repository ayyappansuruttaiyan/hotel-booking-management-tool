import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success(" cabin edited successfully");
      // on successfull cabin created, we should invalidate, stale time will set immediate. so data fetched immediately.
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      //reset(); // we call reset() here, because, after successfully only, we reset the form, otherwise No.
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateCabin, isUpdating };
}
