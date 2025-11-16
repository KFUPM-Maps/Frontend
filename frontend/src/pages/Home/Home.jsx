export default function Home() {
    return (
      <div className="flex h-full items-center justify-center bg-bg-dark text-text">
        {/* الكرت الأساسي */}
        <div className="w-11/12 max-w-2xl bg-bg border border-border rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome to KFUPM Maps
          </h1>
  
          <p className="text-sm md:text-base text-text-muted mb-6">
            Select your starting building and destination to see photo-based routes
            around the KFUPM campus.
          </p>
  
          {/* فورم اختيار المباني (لسه مو متصل بباكند، بس شكل) */}
          <form className="space-y-4">
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="from-building"
              >
                From (Start building)
              </label>
              <input
                id="from-building"
                type="text"
                placeholder="e.g., Building 22"
                className="w-full bg-bg-light border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
  
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="to-building"
              >
                To (Destination)
              </label>
              <input
                id="to-building"
                type="text"
                placeholder="e.g., Building 6"
                className="w-full bg-bg-light border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
  
            <button
              type="button"
              className="mt-2 w-full md:w-auto bg-primary hover:bg-secondary text-text font-medium px-4 py-2 rounded-md transition-colors"
            >
              Show routes
            </button>
          </form>
        </div>
      </div>
    );
  }