'use client';

import {
  LinkIcon,
  RemoveIcon,
  ShareIcon,
  TwitterxIcon,
} from '@/assets/images/icons';
import { useEffect, useState } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

const ShareModal = () => {
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  const url = typeof window !== 'undefined' ? window.location.href : '';

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShareModalVisible(false);
      setIsClosing(false); // Reset exit animation state
    }, 500);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess('Copied');
    } catch {
      setCopySuccess('Failed to copy! Please try again.');
    }
  };

  useEffect(() => {
    if (shareModalVisible) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [shareModalVisible]);

  return (
    <>
      {/* Share Button */}
      <div className="share-button">
        <button
          className="menu-link menu-link_us-s to-share border-0 bg-transparent d-flex align-items-center"
          onClick={() => setShareModalVisible((prev) => !prev)}
        >
          <ShareIcon className="shareIcon" />
          <span>Share</span>
        </button>
      </div>

      {/* Share Modal */}
      {shareModalVisible && (
        <div
          className="position-fixed share-modal-backgorund top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center"
          onClick={handleClose}
          style={{ zIndex: 9999 }}
        >
          <div
            className={`share-modal d-flex flex-column p-5 ${isClosing ? 'exit' : 'enter'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between mb-4">
              <h3 className="text-sm-start text-center m-0">Share</h3>
              <button className="btn p-0" onClick={handleClose}>
                <RemoveIcon />
              </button>
            </div>

            <div className="d-flex flex-column gap-md-4 gap-2">
              <div className="d-flex justify-content-center gap-3">
                <FacebookShareButton url={url}>
                  <FacebookIcon size={35} round />
                </FacebookShareButton>
                <WhatsappShareButton url={url}>
                  <WhatsappIcon size={35} round />
                </WhatsappShareButton>
                <TelegramShareButton url={url}>
                  <TelegramIcon size={35} round />
                </TelegramShareButton>
                <TwitterShareButton url={url}>
                  <TwitterxIcon width={35} height={35} />
                </TwitterShareButton>
              </div>

              <div>
                <p className="text-center">{copySuccess}</p>
                <div className="d-flex justify-content-center position-relative">
                  <input
                    type="text"
                    className="share-link-input ps-3 w-100 border-0 bg-light"
                    value={url}
                    style={{ height: 35 }}
                    readOnly
                  />
                  <button className="btn p-0 px-3" onClick={handleCopy}>
                    <LinkIcon width={15} height={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareModal;
