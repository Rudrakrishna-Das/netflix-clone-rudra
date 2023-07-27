import Banner from "../Components/Banner/Banner";
import Row from "../Components/Row/Row";

import { requests } from "../Requests $ Axios/Responses";

const HomePage = () => {
  return (
    <header>
      <Banner />
      <Row
        forPath="netflixoriginals"
        title="Netflix Originals"
        fetchURL={requests.netflixOriginals}
        isLargeRow
      />
      <Row forPath="trending" title="Trendings" fetchURL={requests.trending} />
      <Row forPath="topRated" title="Top Rated" fetchURL={requests.topRated} />
      <Row forPath="action" title="Action Movies" fetchURL={requests.action} />
      <Row
        forPath="romance"
        title="Romantic Movies"
        fetchURL={requests.romance}
      />
      <Row forPath="comedy" title="Comedy Movies" fetchURL={requests.comedy} />
      <Row forPath="horror" title="Horror Movies" fetchURL={requests.horror} />
      <Row
        forPath="documentries"
        title="Documentaries"
        fetchURL={requests.documentries}
      />
    </header>
  );
};

export default HomePage;
