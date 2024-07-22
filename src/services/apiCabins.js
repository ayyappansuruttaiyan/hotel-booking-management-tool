import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

// this is for creating new cabin and editing a created cabin.
export async function createEditCabin(newCabin, id) {
  // when we update a cabin, if we not uploaded new image, we keep already uploaded image. otherwise we will store the new uploaded image.
  // we should check if the image url is available or not

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  console.log(hasImagePath);
  //  to upload file, 1. need path name
  const imageName = `${Math.random()}-${newCabin.image.name}`; // unique image name

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://tjfthdyxzzdtksunuplz.supabase.co/storage/v1/object/public/cabin-images/cabin_001.jpg

  // here, cabin_001.jpg is unique name. rest supabase cabin-images bucked url

  // 1. create A. cabin/ B. edit cabin

  //A) Create cabin
  //we need to create a cabin if there is no id. If id is there, it means we are editing the cabin.
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be added");
  }

  //  2. if cabin is created successfully, then upload image
  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. delete the cabin, if there is an error uploading the image
  if (uploadError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(uploadError);
    throw new Error(
      "cabin image could not be uploaded. And the cabin could not be created."
    );
  }
  console.log(data);
  // return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
