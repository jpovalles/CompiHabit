import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";

export async function uploadPhoto(idStreak, idUser, image) {
  //const image = result.assets[0];

  const filePath = `${idStreak}/${idUser}.jpg`;

  const { data, error } = await supabase.storage
    .from("proofs")
    .upload(filePath, decode(image.base64), {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("proofs")
    .getPublicUrl(filePath);

  return `${urlData.publicUrl}?t=${new Date().getTime()}`;
}
