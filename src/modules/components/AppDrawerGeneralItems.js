import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// Components
import AppDrawerNavItem from "./AppDrawerNavItem";
import pages from "../../pages";

// functions
import { pageToTitle } from "../utils/helpers";

class AppDrawerGeneralItems extends React.Component {
  renderNavItems = ({ pages, ...params }) => {
    return pages.reduce(
      (items, page) => this.reduceChildRoutes({ items, page, ...params }),
      []
    );
  };

  reduceChildRoutes = ({ props, items, page, depth }) => {
    if (page.children && page.children.length > 0) {
      const primary = pageToTitle(page);
      const secondary = page.subtitle || "";
      const openImmediately =
        props.location.pathname.indexOf(`${page.pathname}/`) === 0 ||
        (page.root && props.location.pathname === "/");
      items.push(
        <AppDrawerNavItem
          depth={depth}
          primary={primary}
          secondary={secondary}
          key={primary}
          openImmediately={openImmediately}
        >
          {this.renderNavItems({
            props,
            pages: page.children,
            depth: depth + 1
          })}
        </AppDrawerNavItem>
      );
    } else {
      const primary = pageToTitle(page);
      const secondary = page.subtitle || "";
      items.push(
        <AppDrawerNavItem
          depth={depth}
          primary={primary}
          secondary={secondary}
          key={primary}
          to={page.pathname}
          onClick={props.onClick}
        />
      );
    }

    return items;
  };

  render() {
    const props = this.props;
    return <>{this.renderNavItems({ props, pages, depth: 0 })}</>;
  }
}

AppDrawerGeneralItems.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default withRouter(AppDrawerGeneralItems);
