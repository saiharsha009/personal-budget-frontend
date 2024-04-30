import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import appIcon from '../Images/appIcon.png'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import WindowIcon from '@mui/icons-material/Window';

import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const navigate = useNavigate();
  const {
    children,
    getBudgets,
    dataForBudget,
    totalBudget,
  } = props;
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const [monthlyBudget, setMonthlyBudget] = React.useState(0);
  const [calculatedAmmount, setCalculatedAmmount] = React.useState(0);

  React.useEffect(() => {
    setMonthlyBudget(dataForBudget?.totalAmount);
    let totalCategoryAmount = 0;
    dataForBudget && dataForBudget.length !=0 && dataForBudget.categories && dataForBudget.categories.length > 0 && dataForBudget.categories.map((cat) => {
      totalCategoryAmount += cat.allocatedAmount;
    });
    setCalculatedAmmount(totalCategoryAmount);
  }, [dataForBudget]);


  React.useEffect(() => {
    setBudgetTotalAmount(totalBudget)
  }, [totalBudget]);

  const [budgetTotalAmount, setBudgetTotalAmount] = React.useState(totalBudget);

  const drawer = (
    <div>
      <Toolbar children={<div style={{ display: "flex", justifyContent: "center", width: "100%" }}><img src={appIcon} alt='' /></div>} />
      <Divider />

      <List>

        <ListItem onClick={() => navigate('/')} key={"Dashboard"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <WindowIcon sx={{ color: "#3b71ca" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#3b71ca" }} primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem onClick={() => navigate('/cofigureBudget')} key={"Your Budget"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountBalanceWalletIcon sx={{ color: "#3b71ca" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#3b71ca" }} primary={"Your Budget"} />
          </ListItemButton>
        </ListItem>

        <Divider />
        <ListItem onClick={() => navigate('/addExpense')} key={"Your Expenses"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PriceChangeIcon sx={{ color: "#3b71ca" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#3b71ca" }} primary={"Your Expenses"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem onClick={() => { navigate('/signin'); localStorage.clear() }} key={"Logout"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: "#3b71ca" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#3b71ca" }} primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Manage your monthly budgets here
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
          <div style={{ width: "100%", display: 'flex', flexDirection: "column", gap: "20px", padding: '20px', color: "#3b71ca", height: "100%", justifyContent: "end" }}>
            <div className="" style={{ fontSize: '20px', fontWeight: '600' }}>
              Budget Amount: {budgetTotalAmount}
            </div>
          </div>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}



export default Navbar;
