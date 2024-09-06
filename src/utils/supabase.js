import { createClient } from "@supabase/supabase-js";
const bucket = "Blog-Image";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(url, key);


export const UploadImage = async (image) => {
  const timestamp = Date.now();
  const newName = `/blog/${timestamp}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });
  if (!data) throw new Error("Image upload failed");
  const result = supabase.storage.from(bucket).getPublicUrl(newName)
    .data.publicUrl;
  console.log(result);
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};





export const UploadImageByUrl = async (image) => {
  console.log(image)
  const timestamp = Date.now();
  const newName = `/blog/${timestamp}-${image.name}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });

  const result = supabase.storage.from(bucket).getPublicUrl(newName)
    .data.publicUrl;
  console.log(result);
  return result;
};
