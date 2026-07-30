import './globals.css';

export const metadata = {
  title: 'Estoque',
  description: 'Gerenciamento de estoque de produtos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}