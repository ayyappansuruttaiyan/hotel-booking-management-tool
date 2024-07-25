import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin created successfully");
      // on successfull cabin created, we should invalidate, stale time will set immediate. so data fetched immediately.
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      //reset(); // we call reset() here, because, after successfully only, we reset the form, otherwise No.
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}
