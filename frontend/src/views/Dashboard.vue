<template>
  <div class="dashboard-container">
    <h3 class="mb-4 font-weight-bold">
      <i class="fas fa-chart-line text-orange mr-0"></i>
       Báo cáo thống kê</h3>
  
    <div class="row mb-4">
      <div class="col-md-3 mb-3">
        <div class="card stat-card border-left-primary shadow-sm p-3">
          <h6 class="text-muted small font-weight-bold">ĐANG CHO MƯỢN</h6>
          <h3 class="text-primary font-weight-bold m-0">85</h3>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card stat-card border-left-danger shadow-sm p-3">
          <h6 class="text-muted small font-weight-bold">TRỄ HẸN TRẢ</h6>
          <h3 class="text-danger font-weight-bold m-0">12</h3>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card stat-card border-left-success shadow-sm p-3">
          <h6 class="text-muted small font-weight-bold">TỔNG SỐ SÁCH</h6>
          <h3 class="text-success font-weight-bold m-0">1,250</h3>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card stat-card border-left-warning shadow-sm p-3">
          <h6 class="text-muted small font-weight-bold">ĐỘC GIẢ MỚI</h6>
          <h3 class="text-warning font-weight-bold m-0">24</h3>
        </div>
      </div>
    </div>
  
    <div class="row">
      <div class="col-md-8 mb-4">
        <div class="card chart-card shadow-sm p-4">
          <h5 class="font-weight-bold mb-4">Thống kê mượn sách 12 tháng</h5>
          <canvas id="barChart"></canvas>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card chart-card shadow-sm p-4">
          <h5 class="font-weight-bold mb-4">Tỉ lệ mượn theo thể loại</h5>
          <canvas id="pieChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  mounted() {
    new Chart(document.getElementById('barChart'), {
      type: 'bar',
      data: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [{ 
          label: 'Lượt mượn', 
          data: [12, 19, 3, 5, 2, 3, 15, 20, 30, 45, 10, 5], 
          backgroundColor: '#ff7f50',
          borderRadius: 8 
        }]
      }
    });

    new Chart(document.getElementById('pieChart'), {
      type: 'pie',
      data: {
        labels: ['Công nghệ', 'Tiểu thuyết', 'Kỹ năng', 'Trinh thám'],
        datasets: [{ 
          data: [30, 20, 25, 25], 
          backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'] 
        }]
      }
    });
  }
}
</script>

<style scoped>
.stat-card {
  border-radius: 15px !important; 
  border: none;
}

.chart-card {
  border-radius: 20px !important; 
  border: none;
}

.border-left-primary { border-left: 5px solid #4e73df !important; }
.border-left-danger { border-left: 5px solid #e74a3b !important; }
.border-left-success { border-left: 5px solid #1cc88a !important; }
.border-left-warning { border-left: 5px solid #f6c23e !important; }

.dashboard-container {
  padding-bottom: 50px;
}
</style>