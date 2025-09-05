export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container-max py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="skeleton h-8 w-48 mb-2"></div>
              <div className="skeleton h-4 w-64"></div>
            </div>
            <div className="skeleton h-10 w-24"></div>
          </div>
        </div>
      </div>

      <div className="container-max py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="card">
              <div className="skeleton h-6 w-20 mb-4"></div>
              <div className="space-y-4">
                <div className="skeleton h-10 w-full"></div>
                <div className="skeleton h-8 w-full"></div>
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="skeleton h-5 w-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="card">
                  <div className="flex items-start gap-4">
                    <div className="skeleton h-12 w-12 rounded-full"></div>
                    <div className="flex-1 space-y-3">
                      <div className="skeleton h-6 w-3/4"></div>
                      <div className="skeleton h-4 w-1/2"></div>
                      <div className="skeleton h-16 w-full"></div>
                      <div className="flex gap-2">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="skeleton h-6 w-16 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

