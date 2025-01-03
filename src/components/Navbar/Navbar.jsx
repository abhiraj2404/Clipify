import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Avatar,
} from "@nextui-org/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, useLocation } from "react-router-dom";
{
  /* <button
  onClick={logout}
  className="bg-red-600 px-4 py-2 rounded-lg w-fit text-white text-2xl "
>
  logout
</button>; */
}

function MyNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      } else {
        console.log("notsignedin");
      }
    });
  }, [isLoggedIn]);

  const logout = async () => {
    try {
      let signOutResponse = await signOut(auth);
      setIsLoggedIn(false);
      navigate("/");
      alert("successfully logged out");
    } catch (error) {
      console.error("error in signout", error);
    }
  };

  const menuItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Clipboard",
      link: "/clipboard",
    },
    {
      name: "Profile",
      link: "/userprofile",
    },
    
  ];

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Link color="foreground" href="/">
            <p className="font-bold text-inherit">CLIPIFY</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem className="font-semibold">
          <Link href="/" color={location.pathname == "/" ? "" : "foreground"}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem className="font-semibold">
          <Link
            href="/clipboard"
            color={location.pathname == "/clipboard" ? "" : "foreground"}
          >
            Clipboard
          </Link>
        </NavbarItem>
        <NavbarItem className="font-semibold">
          <Link
            href="/userprofile"
            color={location.pathname == "/userprofile" ? "" : "foreground"}
          >
            Profile
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {isLoggedIn ? (
            <Button color="danger" variant="bordered" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button as={Link} color="primary" href="/signin" variant="flat">
              Login
            </Button>
          )}
        </NavbarItem>
        {isLoggedIn ? (
          <Avatar
            as={Link}
            href="/userprofile"
            className="transition-transform"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src={currentUser.photoURL}
          />
        ) : null}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              onClick={() => setIsMenuOpen(false)}
              color={location.pathname == item.link ? "" : "foreground"}
              className="w-full"
              href={item.link}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default MyNavbar;
