import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createCabin(newCabin) {
  //  to upload file, 1. need path name
  const imageName = `${Math.random()}-${newCabin.image.name}`; // unique image name

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-image/${imageName}`;

  // https://tjfthdyxzzdtksunuplz.supabase.co/storage/v1/object/public/cabin-images/cabin_001.jpg

  // here, cabin_001.jpg is unique name. rest supabase cabin-images bucked url

  // 1. create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

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
