import React from "react";
import propTypes from "prop-types";
import _ from "lodash";

const Pagination = (props) => {
	const { itemsCount, pageSize, currentPage, onPageChange } = props;

	const pagesCount = Math.ceil(itemsCount / pageSize);
	// [1 ... pagesCount] - JavaScript -> lodash
	if (pagesCount === 1) return null;
	const pages = _.range(1, pagesCount + 1);

	return (
		<nav>
			<ul className="pagination">
				{pages.map((page) => (
					<li
						key={page}
						className={currentPage === page ? "page-item active" : "page-item"}
					>
						<a onClick={() => onPageChange(page)} className="page-link">
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

// Type Checking with propTypes is very important especially when using reusable components.
Pagination.propTypes = {
	itemsCount: propTypes.number.isRequired,
	pageSize: propTypes.number.isRequired,
	currentPage: propTypes.number.isRequired,
	onPageChange: propTypes.func.isRequired,
};

export default Pagination;
