using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

/// <summary>
/// ConvertCommon 的摘要说明
/// </summary>
public static class ConvertCommon
{
    public static List<User> ToUsers(this DataTable dt)
    {
        var result = new List<User>();
        if (dt == null || dt.Rows.Count == 0)
        {
            return result;
        }

        foreach (DataRow row in dt.Rows)
        {
            var model = new User();
            model.age = reurnSafeStr(row["age"]);
            model.userName= reurnSafeStr(row["userName"]);
            model.password = reurnSafeStr(row["password"]);
            model.alias = reurnSafeStr(row["alias"]);
            model.id = Convert.ToInt32(row["id"]);
            result.Add(model);
        }
        return result;

    }

    private static string reurnSafeStr(object obj)
    {
        if(obj==null || obj == DBNull.Value)
        {
            return string.Empty;
        }
        return obj.ToString();
    }

    public static List<Link> ToLinks(this DataTable dt)
    {
        var result = new List<Link>();
        if (dt == null || dt.Rows.Count == 0)
        {
            return result;
        }

        foreach (DataRow row in dt.Rows)
        {
            var model = new Link();
            model.clothId = reurnSafeStr(row["clothId"]);
            model.userId = reurnSafeStr(row["userId"]);
            model.id = Convert.ToInt32(row["id"]);
            result.Add(model);
        }
        return result;

    }

    public static List<Collection> ToCollections(this DataTable dt)
    {
        var result = new List<Collection>();
        if (dt == null || dt.Rows.Count == 0)
        {
            return result;
        }

        foreach (DataRow row in dt.Rows)
        {
            var model = new Collection();
            model.clothId = reurnSafeStr(row["clothId"]);
            model.startTime = reurnSafeStr(row["startTime"]);
            model.endTime = reurnSafeStr(row["endTime"]);
            model.id = Convert.ToInt32(row["id"]);
            result.Add(model);
        }
        return result;

    }

    public static List<Share> ToShares(this DataTable dt)
    {
        var result = new List<Share>();
        if (dt == null || dt.Rows.Count == 0)
        {
            return result;
        }

        foreach (DataRow row in dt.Rows)
        {
            var model = new Share();
            model.clothId = reurnSafeStr(row["clothId"]);
            model.date = reurnSafeStr(row["date"]);
            model.describe = reurnSafeStr(row["describe"]);
            model.id = Convert.ToInt32(row["id"]);
            result.Add(model);
        }
        return result;

    }
}