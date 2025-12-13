import { useEffect, useState } from 'react';

const ProtecRouteHook = ({off}) => {
  const [islogged, setIsLogged] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log("storedUser" ,storedUser)
    setIsLogged(!!storedUser); // إذا كانت القيمة موجودة، اعتبر المستخدم مسجل
  }, []);

  return [islogged];
};

export default ProtecRouteHook;
