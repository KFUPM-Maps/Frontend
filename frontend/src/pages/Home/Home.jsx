import Map from './Map';

export default function Home() {
    return (
    <div className="w-full h-screen overflow-hidden touch-none">
      <Map
        className="w-full h-full bg-linear-to-t from-bg to-bg-light"
        handelClick={(e) => {
          const id = e.target.id;
          console.log(`Clicked on building with id: ${id}`);
        }}
      />
    </div>
    );
  }