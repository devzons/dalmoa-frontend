import { Container } from "@/components/base/Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <Container className="py-10 text-sm text-neutral-500">
        © {new Date().getFullYear()} Dalmoa. All rights reserved.
      </Container>
    </footer>
  );
}