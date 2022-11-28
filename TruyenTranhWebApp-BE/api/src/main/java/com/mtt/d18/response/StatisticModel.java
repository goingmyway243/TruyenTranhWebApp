package com.mtt.d18.response;

public class StatisticModel {
	private long totalUser;
	private long totalComic;
	private long totalGenre;
	private long totalAuthor;
	
	
	public StatisticModel() {
	}

	public StatisticModel(long totalUser, long totalComic, long totalGenre, long totalAuthor) {
		super();
		this.totalUser = totalUser;
		this.totalComic = totalComic;
		this.totalGenre = totalGenre;
		this.totalAuthor = totalAuthor;
	}
	
	public long getTotalUser() {
		return totalUser;
	}
	public void setTotalUser(long totalUser) {
		this.totalUser = totalUser;
	}
	public long getTotalComic() {
		return totalComic;
	}
	public void setTotalComic(long totalComic) {
		this.totalComic = totalComic;
	}
	public long getTotalGenre() {
		return totalGenre;
	}
	public void setTotalGenre(long totalGenre) {
		this.totalGenre = totalGenre;
	}
	public long getTotalAuthor() {
		return totalAuthor;
	}
	public void setTotalAuthor(long totalAuthor) {
		this.totalAuthor = totalAuthor;
	}
}
