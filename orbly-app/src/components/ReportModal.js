import React from "react";
import './styles/ReportModal.css';

const ReportModal = ({
    reportModal,
    reportModalRef,
    selectedPost,
    handleReportModal,
    setPostMenu,
}) => {
    return ( 
        <div>
            {reportModal && selectedPost && (
                <div className="report-modal">
                    <div className="report-modal-content" ref={reportModalRef}>
                        <div className="report-modal-items">
                            <div className="report-modal-item border">
                                It's Spam
                            </div>
                            <div className="report-modal-item border">
                                It's Inappropriate
                            </div>
                            <div className="report-modal-item border">
                                It's Abusive or Harmful
                            </div>
                            <div className="report-modal-item border">
                                Hate Speech or Symbols
                            </div>
                            <div className="report-modal-item border">
                                Violence or Threats
                            </div>
                            <div className="report-modal-item border">
                                It's a Scam or Fraud
                            </div>
                            <div className="report-modal-item border">
                                Intellectual Property Violation
                            </div>
                            <div className="report-modal-item border">
                                It's Something Else
                            </div>
                            <div className="report-modal-cancel" onClick={() => {handleReportModal(); setPostMenu(true)}}>
                                Cancel
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default ReportModal;