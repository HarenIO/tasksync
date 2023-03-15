import React, {useState} from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import './loginregister.css';
import LoginTab from './LoginTab';
import RegisterTab from './RegisterTab';

const LoginRegister = () => {

  const [selectedTab, setSelectedTab] = useState('tab1');
  return(
    <Tabs.Root value={selectedTab} onValueChange={setSelectedTab} className="TabsRoot" defaultValue="tab1">
    <Tabs.List className="TabsList" aria-label="Login / Register">
      <Tabs.Trigger className="TabsTrigger" value="tab1">
        Login
      </Tabs.Trigger>
      <Tabs.Trigger className="TabsTrigger" value="tab2">
        Register
      </Tabs.Trigger>
    </Tabs.List>
    <LoginTab />
    <RegisterTab setSelectedTab={setSelectedTab}/>
  </Tabs.Root>
  )

};

export default LoginRegister;