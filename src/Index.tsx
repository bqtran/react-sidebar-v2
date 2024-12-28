function Index() {
  return  <div className="flex h-screen w-screen p-10">
            <div className="flex-1">
              <h1 className={"text-xl font-medium"}>Example Maps</h1>
              <ul className="list-disc list-inside">
                <li><a className={"font-normal text-blue-600 hover:text-purple-600"} href="/reactleaflet">React-Leaflet</a></li>
                <li><a className={"font-normal text-blue-600 hover:text-purple-600"} href="/maplibre">MapLibre GL JS</a></li>
              </ul>
            </div>
  </div>
}

export default Index
