import React, { useState, useEffect } from 'react';
import ipaddress from '../Components/IpAddress';

function DownloadImage(props) {
  const { cid, bid, expid, reqid } = props;
  const [imageData, setImageData] = useState(null);
  const [contentType, setContentType] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(`http://${ipaddress}/exportsub/download/${cid}/${bid}/${expid}/${reqid}`)
      .then((response) => {
        if (response.ok) {
          setContentType(response.headers.get('content-type'));
          return response.blob();
        } else {
          throw new Error('File not found');
        }
      })
      .then((data) => {
        setImageData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [cid, bid, expid, reqid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (imageData) {
    if (contentType === 'application/pdf') {
      const pdfUrl = URL.createObjectURL(new Blob([imageData], { type: 'application/pdf' }));
      return <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="600" />;
    } else if (contentType.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(new Blob([imageData], { type: contentType }));
      return <img src={imageUrl} alt="Image" />;
    }
  }

  return <div>File not found or unsupported format.</div>;
}

export default DownloadImage;
