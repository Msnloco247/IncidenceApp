import './ExploreContainer.css';

interface ContainerProps {
  children: React.ReactNode;
}

const ExploreContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div id="container">
      {children}
   </div>
  );
};

export default ExploreContainer;
