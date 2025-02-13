import { roboto } from "~/app/fonts";
import { Container } from "./styles";
import { MirrorDetailsContent } from "~/components/surfaces/MirrorDetailsContent";
export default function Espelho() {
  return (
    <>
      <Container className={roboto.className}>
        <MirrorDetailsContent />
      </Container>
    </>
  );
}
