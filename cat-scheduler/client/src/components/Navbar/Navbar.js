import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./index.css";
import { Link } from "react-router-dom";
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event) {
  console.log(event);
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const Navbar = () => {
  return (
    <div className="nav">
      <p className="Nav-Title">Shirley's Cat Spa</p>
      <div className="nav-head">
        <div className="nav-contents">
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link to="/">
                <StyledBreadcrumb
                  component="a"
                  href="#"
                  label="Home"
                  icon={<HomeIcon fontSize="small" />}
                />
              </Link>
              <Link to="/schedule">
                <StyledBreadcrumb component="a" href="#" label="Schedule" />
              </Link>
              <Link to="/FAQ">
                <StyledBreadcrumb
                  label="FAQ"
                  deleteIcon={<ExpandMoreIcon />}
                  onDelete={handleClick}
                />
              </Link>
            </Breadcrumbs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
