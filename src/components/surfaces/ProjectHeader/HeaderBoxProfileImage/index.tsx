import { Container } from "./styles";
import { useState } from "react";
import Image from "next/image";

interface HeaderBoxProfileImageProps {
  projectName?: string;
}

export default function HeaderBoxProfileImage({
  projectName,
}: HeaderBoxProfileImageProps) {
  const [selectedFile] = useState<File | null>(null);

  const getInitials = (name?: string) => {
    if (!name) return "";
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0));
    return initials.join("").toUpperCase();
  };

  const initialsString = getInitials(projectName);

  return (
    <Container>
      {selectedFile ? (
        <Image
          src={URL.createObjectURL(selectedFile)}
          alt="Imagem selecionada"
        />
      ) : (
        <span>{initialsString}</span>
      )}
    </Container>
  );
}
