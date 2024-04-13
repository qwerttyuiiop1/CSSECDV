import React, { useState } from 'react';
import styles from "./page.module.css";
import { Report, TransactionItem } from '@type/Transaction';
import { EditReportModal, CreateReportModal } from './ReportModal';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
type Item = TransactionItem & { id: number };
interface DescriptionContainerProps {
  selectedItem: Item | null;
  onUpdate: (item: Item) => void;
}

export const DescriptionContainer = ({ selectedItem, onUpdate }: DescriptionContainerProps) => {
  const { data: session } = useSession();
  const [ selectedReport, setSelectedReport ] = useState<Report | null>(null);
  const editReportModal = useState(false);
  const createReportModal = useState(false);
  const handleUpdateReport = (report: Report) => {
	if (!selectedItem)
	  return;
	const updatedReports = selectedItem.reports.map(r => r.id === report.id ? report : r);
	onUpdate({ ...selectedItem, reports: updatedReports });
  }
  const handleCreateReport = (report: Report) => {
	if (!selectedItem)
	  return;
	onUpdate({ ...selectedItem, reports: [ ...selectedItem.reports, report ] });
  }
  const handleSetReport = (report: Report) => {
	if (session?.user?.email !== report.user.email)
	  return;
	setSelectedReport(report);
	editReportModal[1](true);
  }

  if (!selectedItem)
    return <div className={styles.descriptionContainer}>
		<p>Select an item to see its description.</p>
	</div>

  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.itemImage}>
        <Image fill src={selectedItem.img} alt={selectedItem.product.name} />
        <div className={styles.itemId}>#{selectedItem.id}</div>
    
      <div>
        <h3 className={styles.product_name}>{selectedItem.product.name}</h3>
        <p className={styles.product_code}>{selectedItem.code}</p>
        </div>
        <div className={styles.horizontalLine}></div>
        </div>
        <h3 className={styles.bold_text}>Product Description:</h3>
        <p className={styles.product_desc}>
          {selectedItem.product.details}
        </p>
        <h3 className={styles.bold_text}>Terms & Conditions:</h3>
		{/*<ul className={styles.tc}>
            <li className={styles.report_body}> </li>
  		</ul>*/}
		<p className={styles.report_body}>{selectedItem.product.tos}</p>

		<div className={styles.horizontalLine}></div>
        <h3 className={styles.bold_text}>Reports:</h3>
		{selectedItem.reports.map(report => (
			<div className={styles.report_container} key={report.id} onClick={
				session?.user.email === report.user.email ? () => handleSetReport(report) : undefined}>
				<p className={styles.report_header}>
					{report.user.name} - {new Date(report.date).toLocaleDateString()}
				{ session?.user.email === report.user.email &&  " - Edit"}
				</p>
				<p className={styles.report_body}>
					{report.comment} 
				</p>
			</div>
		))}
		<EditReportModal 
			state={editReportModal} 
			report={selectedReport} 
			onUpdate={handleUpdateReport} />
		<CreateReportModal
			state={createReportModal}
			code={selectedItem.code}
			productId={selectedItem.product.id}
			onCreate={handleCreateReport} />
		<button onClick={() => createReportModal[1](true)} className={styles.create_report_button}>Create Report</button>
    </div>
  );
};