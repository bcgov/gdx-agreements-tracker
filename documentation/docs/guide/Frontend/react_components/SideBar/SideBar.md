# Sidebar Component

## Description

The `Sidebar` component is a navigation menu located on the left side of the application. It contains a `SidebarMenu` component for displaying navigation links. The sidebar can be toggled between a mobile and desktop view based on the screen size.

## Props

- `drawerOpen`: A boolean indicating whether the sidebar is open or closed.
- `handleDrawerToggle`: A function to handle the toggle action of the sidebar.

## Usage

```jsx
<Sidebar
  drawerOpen={drawerOpen}
  handleDrawerToggle={handleDrawerToggle}
/>
