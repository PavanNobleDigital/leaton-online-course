import HeaderEight from "./Headers/Header-Eight";

const HeaderStyleTen = ({ headerSticky }) => {
  return (
    <>
      <header className="rbt-header rbt-header-10">
        <HeaderEight
          headerSticky={headerSticky}
          sticky="header-sticky"
          container="container-fluid"
          gapSpaceBetween="header-space-betwween"
          navigationEnd="rbt-navigation-start"
        />
      </header>
    </>
  );
};
export default HeaderStyleTen;
