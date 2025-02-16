const CurrentDateTime: React.FC<{ username: string }> = ({ username }) => {
    const [currentDateTime, setCurrentDateTime] = useState('');
  
    useEffect(() => {
      const updateDateTime = () => {
        const now = new Date();
        setCurrentDateTime(now.toISOString().replace('T', ' ').slice(0, 19));
      };
  
      updateDateTime();
      const timer = setInterval(updateDateTime, 1000);
      return () => clearInterval(timer);
    }, []);
  
    return `Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): ${currentDateTime}\nCurrent User's Login: ${username}\n`;
  };
  
  export default CurrentDateTime;