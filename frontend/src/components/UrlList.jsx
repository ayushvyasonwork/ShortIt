import UrlItem from './UrlItem';

export default function UrlList({ urls }) {
  return (
    <div className="mt-4">
      {urls.map(url => <UrlItem key={url.shortCode} url={url} />)}
    </div>
  );
}
