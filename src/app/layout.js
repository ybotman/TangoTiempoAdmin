import PropTypes from 'prop-types';

export const metadata = {
  title: 'TangoTiempo Admin',
  description: 'Admin interface for TangoTiempo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
