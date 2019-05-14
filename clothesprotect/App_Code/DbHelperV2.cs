using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Web;

/// <summary>
/// DbHelperV2 的摘要说明
/// </summary>
public class DbHelperV2
{
    // "System.Data.SqlClient"
    private static string dbProviderName = ConfigurationManager.ConnectionStrings["clothesConnectionString"].ProviderName;
    private static string dbConnectionString = ConfigurationManager.ConnectionStrings["clothesConnectionString"].ConnectionString;
    private static DbProviderFactory dbfactory;

    public DbHelperV2()
    {
        dbfactory = DbProviderFactories.GetFactory(dbProviderName);
    }

    public DbConnection CreateConnection()
    {
        DbConnection dbconn = dbfactory.CreateConnection();
        dbconn.ConnectionString = dbConnectionString;
        return dbconn;
    }


    /// <summary>
    /// 批量操作并开启事务 数据较多的建议 分组
    /// </summary>
    /// <param name="sqls"></param>
    public void ExecuteNonQuery(List<string> sqls)
    {
        using (DbConnection connection = dbfactory.CreateConnection())
        {
            connection.ConnectionString = dbConnectionString;
            connection.Open();
            DbTransaction transaction;
            using (DbCommand cmd = connection.CreateCommand())
            {
                //启动事务
                transaction = connection.BeginTransaction();
                cmd.Connection = connection;
                cmd.Transaction = transaction;
                try
                {
                    foreach (var sql in sqls)
                    {
                        cmd.CommandText = sql;
                        cmd.ExecuteNonQuery();
                    }
                    //完成提交
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    //数据回滚
                    transaction.Rollback();
                    throw ex;
                }
            }
        }

    }


    public object ExecuteScalar(string sqlText)
    {
        object result = new object();
        using (DbConnection connection = dbfactory.CreateConnection())
        {
            connection.ConnectionString = dbConnectionString;
            connection.Open();
            DbTransaction transaction;
            using (DbCommand cmd = connection.CreateCommand())
            {
                //启动事务
                transaction = connection.BeginTransaction();
                cmd.Connection = connection;
                cmd.Transaction = transaction;
                try
                {
                    cmd.CommandText = sqlText;
                    result = cmd.ExecuteScalar();
                    //完成提交
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    //数据回滚
                    transaction.Rollback();
                    throw ex;
                }
            }
        }
        return result;
    }

    public DataTable ExecuteDataTable(string sqlText)
    {
        DataTable dt = new DataTable();
        using (DbDataAdapter adapter = dbfactory.CreateDataAdapter())
        {
            using (DbConnection connection = dbfactory.CreateConnection())
            {
                connection.ConnectionString = dbConnectionString;
                connection.Open();
                DbCommand cmd = connection.CreateCommand();                
                cmd.CommandText = sqlText;                
                adapter.SelectCommand = cmd;
                adapter.Fill(dt);
            }
        }
        return dt;
    }









}