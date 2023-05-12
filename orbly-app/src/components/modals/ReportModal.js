import React from "react";
import "./styles/ReportModal.css";

const ReportModal = ({
    reportMenu,
    reportMenuRef,
    selectedPost,
    authUser,
    handleReportMenu,
    setPostMenu,
}) => {
    return ( 
        <>
            {reportMenu && selectedPost && (
                <div className="report-modal-background">
                    <div className={authUser.uid === selectedPost.postAuthor ? 'report-modal' : 'report-modal-null'} ref={reportMenuRef}>
                        <div className="report-modal-items">
                            <div className="report-modal-item">
                                It's spam
                            </div>
                            <div className="report-modal-item">
                                It's inappropriate
                            </div>
                            <div className="report-modal-item">
                                It's abusive or harmful
                            </div>
                            <div className="report-modal-item">
                                Nudity or sexual activity
                            </div>
                            <div className="report-modal-item">
                                Hate speech or symbols
                            </div>
                            <div className="report-modal-item">
                                Violence or dangerous organizations
                            </div>
                            <div className="report-modal-item">
                                Sale of illegal or regulated goods
                            </div>
                            <div className="report-modal-item">
                                Bullying or harassment
                            </div>
                            <div className="report-modal-item">
                                Intellectual property violation
                            </div>
                            <div className="report-modal-item">
                                Suicide or self-injury
                            </div>
                            <div className="report-modal-item">
                                False Information
                            </div>
                            <div className="report-modal-item warning" onClick={() => {handleReportMenu(); setPostMenu(true);}}>
                                Cancel
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
 
export default ReportModal;